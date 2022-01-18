import './App.css';
import Login from './components/page/Login';
import { Routes, Route} from "react-router-dom";
import HomeAdmin from './components/page/HomeAdmin';
import HomePetugas from './components/page/HomePetugas';
import HomeSiswa from './components/page/HomeSiswa';
import routes from './configs/routes';
import Entri from './components/page/Entri';
import HistoriAdmin from './components/page/HistoriAdmin';
import DataSiswaCRUD from './components/page/DataSiswaCRUD';
import DataAdminPetugasCRUD from './components/page/DataAdminPetugasCRUD';
import DataKelasCRUD from './components/page/DataKelasCRUD';
import DataSPPCRUD from './components/page/DataSPPCRUD';
import HistoriSiswa from './components/page/HistoriSiswa';
import Coba from './components/fragments/Coba';

function App() {
  return (
    <div>
      <Routes>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.HOME_ADMIN} element={<HomeAdmin />} />
        <Route path={routes.HOME_PETUGAS} element={<HomePetugas />} />
        <Route path={routes.HOME_SISWA} element={<HomeSiswa />} />
        <Route path={routes.ENTRI} element={<Entri />} />
        <Route path={routes.HISTORI_ADMIN} element={<HistoriAdmin />} />
        <Route path={routes.DATA_SISWA} element={<DataSiswaCRUD />} />
        <Route path={routes.DATA_ADMINPETUGAS} element={<DataAdminPetugasCRUD/>} />
        <Route path={routes.DATA_KELAS} element={<DataKelasCRUD/>} />
        <Route path={routes.DATA_SPP} element={<DataSPPCRUD/>} />
        <Route path={routes.HISTORI_SISWA} element={<HistoriSiswa/>} />
      </Routes>
    </div>
  );
}

export default App;