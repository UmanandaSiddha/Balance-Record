import CreateTransaction from '@/components/Create';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <CreateTransaction />
      <Dashboard />
    </div>
  )
}
