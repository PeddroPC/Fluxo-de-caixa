import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Relatorios from "./pages/Relatorios";
import Metas from "./pages/Metas";
import Investimentos from "./pages/Investimentos";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="receitas" element={<Receitas />} />
      <Route path="despesas" element={<Despesas />} />
      <Route path="relatorios" element={<Relatorios />} />
      <Route path="investimentos" element={<Investimentos />} />
      <Route path="metas" element={<Metas />} />
    </Route>
  </Routes>
);

export default AppRoutes;
