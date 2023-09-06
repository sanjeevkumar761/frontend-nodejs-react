import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TalkToData from './pages/talktodata';

function App() {
  return (
  <TalkToData />
  )
}

export default App;
