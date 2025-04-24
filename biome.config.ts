module.exports = {
  lint: {
    extends: [
      'biome:recommended',
      'biome:prettier', // Para integrar com Prettier
    ],
    parserOptions: {
      ecmaVersion: 2020, // Configuração para suportar ES6+
    },
    
  },
  format: {
    printWidth: 80, // Largura da linha
    tabWidth: 2,    // Tamanho da tabulação
    singleQuote: true, // Usar aspas simples
  },
};
