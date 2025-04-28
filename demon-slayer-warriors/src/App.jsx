import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'
import CreateWarrior from './pages/CreateWarriors'
import Gallery from './pages/Gallery'
import EditWarrior from './pages/EditWarrior'
import WarriorDetail from './pages/WarriorDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateWarrior />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/edit/:id" element={<EditWarrior />} />
        <Route path="/warrior/:id" element={<WarriorDetail />} />
      </Route>
    </Routes>
  )
}
