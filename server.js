const express = require("express");
const path = require("path");

const app = express();

// Define a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Mapeamento de slugs para arquivos HTML
const slugMapping = {
  "": "portfolio.html",
  "portfolio": "portfolio.html",
  "projetos": "projetos.html",
  "projetos/vision": "projetos/visiont.html",
  "projetos/drakarla": "projetos/drakarla.html",
  "projetos/curadoria": "projetos/curadoria.html",
  "projetos/assessoria": "projetos/assessoria.html",
  "projetos/foxaligner": "projetos/foxaligner.html",
};

// Rota principal ("/")
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "pages", slugMapping[""]);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Página inicial não encontrada.");
    }
  });
});

// Rota dinâmica com suporte a slugs compostos ("/:slug*")
app.get("/*", (req, res) => {
  const slug = req.params[0]; // Captura o caminho completo após "/"
  const file = slugMapping[slug];

  if (file) {
    const filePath = path.join(__dirname, "public", "pages", file);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.redirect("/"); // Redireciona para a página inicial em caso de erro ao carregar o arquivo
      }
    });
  } else {
    res.redirect("/"); // Redireciona para a página inicial se o slug não existir
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
