import React, { useState, useMemo, useEffect } from 'react';
import { NCERT_DATA } from '../constants';
import type { StudyTopic } from '../types';
import { BookTextIcon } from './icons/BookTextIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { CopyStackIcon } from './icons/CopyStackIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { PenSquareIcon } from './icons/PenSquareIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { GalleryHorizontalIcon } from './icons/GalleryHorizontalIcon';

interface ControlPanelProps {
  onStartChat: (topic: StudyTopic) => void;
  onGenerateFlashcards: (topic: StudyTopic) => void;
  onGenerateTest: (topic: StudyTopic) => void;
  onGenerateStudyPlan: () => void;
  onGenerateSummary: (topic: StudyTopic) => void;
  onGenerateNotes: (topic: StudyTopic) => void;
  onGenerateHomework: (topic: StudyTopic) => void;
  onGenerateDiagram: (topic: StudyTopic, count: number) => void;
  isBusy: boolean;
}

const classes = Object.keys(NCERT_DATA);

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onStartChat, 
  onGenerateFlashcards, 
  onGenerateTest,
  onGenerateStudyPlan,
  onGenerateSummary,
  onGenerateNotes,
  onGenerateHomework,
  onGenerateDiagram,
  isBusy 
}) => {
  const [selectedClass, setSelectedClass] = useState<keyof typeof NCERT_DATA>('9');
  const [selectedSubject, setSelectedSubject] = useState('Science');
  const [selectedBook, setSelectedBook] = useState('NCERT');
  const [selectedChapter, setSelectedChapter] = useState('Matter in Our Surroundings');
  const [diagramCount, setDiagramCount] = useState<number>(1);

  const subjects = useMemo(() => Object.keys(NCERT_DATA[selectedClass]), [selectedClass]);
  const books = useMemo(() => Object.keys((NCERT_DATA[selectedClass] as any)[selectedSubject] || {}), [selectedClass, selectedSubject]);
  const chapters = useMemo(() => {
    const subjectData = (NCERT_DATA[selectedClass] as any)[selectedSubject];
    return subjectData ? (subjectData[selectedBook] || []) : [];
  }, [selectedClass, selectedSubject, selectedBook]);

  useEffect(() => {
    const newSubjects = Object.keys(NCERT_DATA[selectedClass]);
    if (!newSubjects.includes(selectedSubject)) setSelectedSubject(newSubjects[0]);
  }, [selectedClass, selectedSubject]);

  useEffect(() => {
    const classData = NCERT_DATA[selectedClass] as any;
    const subjectData = classData[selectedSubject];
    const newBooks = Object.keys(subjectData || {});
    if (!newBooks.includes(selectedBook)) setSelectedBook(newBooks[0] || '');
  }, [selectedClass, selectedSubject, selectedBook]);

  useEffect(() => {
    const classData = NCERT_DATA[selectedClass] as any;
    const subjectData = classData[selectedSubject];
    const bookData = subjectData ? subjectData[selectedBook] : undefined;
    const newChapters = Array.isArray(bookData) ? bookData : [];
    if (!newChapters.includes(selectedChapter)) setSelectedChapter(newChapters[0] || '');
  }, [selectedClass, selectedSubject, selectedBook, selectedChapter]);

  const getTopic = (): StudyTopic | null => {
    if (!selectedChapter) return null;
    return {
      class: selectedClass,
      subject: selectedSubject,
      book: selectedBook,
      chapter: selectedChapter,
    };
  };

  const selectClasses = "w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50";
  const actionButtonClasses = "disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-3 rounded-lg transition-transform transform active:scale-95 flex items-center justify-center shadow-md text-sm text-center";

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700/50">
      <h2 className="text-xl font-bold text-white mb-4">Select Your Study Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value as keyof typeof NCERT_DATA)} className={selectClasses}>
          {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
        </select>
        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className={selectClasses} disabled={!subjects.length}>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} className={selectClasses} disabled={!books.length}>
           {books.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={selectedChapter} onChange={e => setSelectedChapter(e.target.value)} className={selectClasses} disabled={!chapters.length}>
          {chapters.map(ch => <option key={ch} value={ch}>{ch}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         <button onClick={() => { const t = getTopic(); if(t) onStartChat(t); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} bg-indigo-600 hover:bg-indigo-700`}>
          <BookTextIcon className="w-5 h-5 mr-2" /> Study Session
        </button>
        <button onClick={() => { const t = getTopic(); if(t) onGenerateSummary(t); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} bg-sky-600 hover:bg-sky-700`}>
          <FileTextIcon className="w-5 h-5 mr-2" /> Get Summary
        </button>
        <button onClick={() => { const t = getTopic(); if(t) onGenerateFlashcards(t); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} bg-purple-600 hover:bg-purple-700`}>
          <CopyStackIcon className="w-5 h-5 mr-2" /> Flashcards
        </button>
        <button onClick={() => { const t = getTopic(); if(t) onGenerateTest(t); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} bg-teal-600 hover:bg-teal-700`}>
          <ClipboardCheckIcon className="w-5 h-5 mr-2" /> Take a Test
        </button>
        <button onClick={() => { const t = getTopic(); if(t) onGenerateNotes(t); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} bg-amber-600 hover:bg-amber-700`}>
          <ClipboardListIcon className="w-5 h-5 mr-2" /> Get Study Notes
        </button>
        <button onClick={() => { const t = getTopic(); if(t) onGenerateHomework(t); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} bg-lime-600 hover:bg-lime-700`}>
          <PenSquareIcon className="w-5 h-5 mr-2" /> Get Homework
        </button>
        <div className="flex rounded-lg bg-cyan-600">
            <button onClick={() => { const t = getTopic(); if(t) onGenerateDiagram(t, diagramCount); }} disabled={isBusy || !selectedChapter} className={`${actionButtonClasses} flex-grow bg-cyan-600 hover:bg-cyan-700 rounded-l-lg`}>
              <GalleryHorizontalIcon className="w-5 h-5 mr-2" /> Generate Diagram
            </button>
            <select value={diagramCount} onChange={(e) => setDiagramCount(Number(e.target.value))} disabled={isBusy || !selectedChapter} className="bg-cyan-700 text-white p-2 rounded-r-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none">
                <option value={1}>1</option>
                <option value={4}>4</option>
            </select>
        </div>
        <button onClick={onGenerateStudyPlan} disabled={isBusy} className={`${actionButtonClasses} bg-rose-600 hover:bg-rose-700`}>
          <CalendarDaysIcon className="w-5 h-5 mr-2" /> Create Study Plan
        </button>
      </div>
    </div>
  );
};