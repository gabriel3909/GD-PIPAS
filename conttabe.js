import React, { useState } from 'react';
import { DollarSign, TrendingUp, Package, ShoppingCart, PieChart, Calculator } from 'lucide-react';

export default function GestaoFinanceiraPipas() {
  const [custos, setCustos] = useState({
    varetas: 2.50,
    papel: 1.50,
    cola: 0.80,
    linha: 3.00,
    rabiola: 0.50,
    outros: 1.20
  });

  const [vendas, setVendas] = useState({
    precoVenda: 15.00,
    quantidadeMes: 50
  });

  const [despesasFixas, setDespesasFixas] = useState({
    aluguel: 500,
    energia: 80,
    internet: 60,
    transporte: 150
  });

  const custoUnitario = Object.values(custos).reduce((a, b) => a + b, 0);
  const receitaMensal = vendas.precoVenda * vendas.quantidadeMes;
  const custoTotalProducao = custoUnitario * vendas.quantidadeMes;
  const despesasFixasTotais = Object.values(despesasFixas).reduce((a, b) => a + b, 0);
  const lucroMensal = receitaMensal - custoTotalProducao - despesasFixasTotais;
  const margemLucro = ((lucroMensal / receitaMensal) * 100).toFixed(1);
  const pontoEquilibrio = Math.ceil(despesasFixasTotais / (vendas.precoVenda - custoUnitario));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <DollarSign className="w-12 h-12 text-purple-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Gestão Financeira</h1>
              <p className="text-gray-600">Negócio de Fabricação e Venda de Pipas</p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Receita Mensal</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">R$ {receitaMensal.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{vendas.quantidadeMes} pipas vendidas</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Custos Totais</h3>
              <Package className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">R$ {(custoTotalProducao + despesasFixasTotais).toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Produção + Fixos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Lucro Líquido</h3>
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <p className={`text-3xl font-bold ${lucroMensal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {lucroMensal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Margem: {margemLucro}%</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Ponto de Equilíbrio</h3>
              <Calculator className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{pontoEquilibrio}</p>
            <p className="text-sm text-gray-500 mt-1">pipas/mês</p>
          </div>
        </div>

        {/* Seção de Custos de Produção */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-600" />
              Custos de Produção (por unidade)
            </h2>
            <div className="space-y-4">
              {Object.entries(custos).map(([item, valor]) => (
                <div key={item} className="flex items-center justify-between">
                  <label className="text-gray-700 capitalize font-medium">{item}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">R$</span>
                    <input
                      type="number"
                      step="0.10"
                      value={valor}
                      onChange={(e) => setCustos({...custos, [item]: parseFloat(e.target.value) || 0})}
                      className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Custo Total por Pipa:</span>
                  <span className="text-2xl font-bold text-purple-600">R$ {custoUnitario.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
              Vendas
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-gray-700 font-medium block mb-2">Preço de Venda (unidade)</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-lg">R$</span>
                  <input
                    type="number"
                    step="0.50"
                    value={vendas.precoVenda}
                    onChange={(e) => setVendas({...vendas, precoVenda: parseFloat(e.target.value) || 0})}
                    className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-700 font-medium block mb-2">Quantidade Vendida (mês)</label>
                <input
                  type="number"
                  value={vendas.quantidadeMes}
                  onChange={(e) => setVendas({...vendas, quantidadeMes: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Lucro por Pipa</p>
                <p className="text-2xl font-bold text-purple-700">
                  R$ {(vendas.precoVenda - custoUnitario).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Despesas Fixas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-600" />
            Despesas Fixas Mensais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(despesasFixas).map(([item, valor]) => (
              <div key={item} className="space-y-2">
                <label className="text-gray-700 capitalize font-medium block">{item}</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">R$</span>
                  <input
                    type="number"
                    step="10"
                    value={valor}
                    onChange={(e) => setDespesasFixas({...despesasFixas, [item]: parseFloat(e.target.value) || 0})}
                    className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800 text-lg">Total Despesas Fixas:</span>
              <span className="text-2xl font-bold text-red-600">R$ {despesasFixasTotais.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Análise e Recomendações */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Análise e Recomendações</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${lucroMensal >= 0 ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
              <h3 className="font-bold text-gray-800 mb-2">Status do Negócio</h3>
              <p className="text-gray-700">
                {lucroMensal >= 0 
                  ? `Seu negócio está lucrativo! Com uma margem de ${margemLucro}% sobre as vendas.`
                  : `Atenção! Seu negócio está com prejuízo de R$ ${Math.abs(lucroMensal).toFixed(2)}. Revise custos e preços.`
                }
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-800 mb-2">Ponto de Equilíbrio</h3>
              <p className="text-gray-700">
                Você precisa vender pelo menos <strong>{pontoEquilibrio} pipas por mês</strong> para cobrir todos os custos. 
                Atualmente você está vendendo <strong>{vendas.quantidadeMes} pipas</strong>.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-800 mb-2">Dicas para Aumentar a Lucratividade</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Negocie preços melhores com fornecedores para reduzir custos</li>
                <li>Ofereça kits com linha e rabiola para aumentar o ticket médio</li>
                <li>Crie pipas personalizadas com preços premium</li>
                <li>Reduza desperdícios otimizando o corte dos materiais</li>
                <li>Venda online para alcançar mais clientes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}