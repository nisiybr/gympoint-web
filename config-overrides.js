// node, por isso nao vamos dar import
const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import', // primeira posicao eh o nome do plugin
    // segunda posica=o vai ser algumas configuracoes
    {
      rootPathSuffix: 'src', // pasta onde estao as maiores quantidades de arquivos
    },
  ])
);
