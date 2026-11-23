import { createBrowserRouter } from 'react-router'
import { Layout } from './components/layout/Layout'
import { navItems } from './content/site'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TabPage } from './pages/TabPage'

// 営業用の見本：トップ（ヒーローだけ）＋タブ（客室・お料理・アクセス。中身は作らない）
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      ...navItems.map((item) => ({ path: item.to.slice(1), element: <TabPage to={item.to} /> })),
      // 「空室を見る」の行き先が決まるまでの仮のページ
      { path: 'booking', element: <TabPage to="/booking" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
