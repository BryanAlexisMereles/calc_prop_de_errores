function calcularDerivada() {
  const mathField = document.getElementById("funcion");
  const inputFuncionLatex = mathField.getValue("latex");
  const inputFuncionAsciiMath =
    MathLive.convertLatexToAsciiMath(inputFuncionLatex);
  const inputVar = document.getElementById("var").value;
  let arrayVariables = inputVar.split(";");

  try {
    const funcion = math.parse(inputFuncionAsciiMath);
    let derivadaLatex = "";

    arrayVariables.forEach((variable, index) => {
      if (index === arrayVariables.length - 1) {
        derivadaLatex +=
          `\\left| ${math
            .parse(
              math.derivative(funcion, variable, { simplify: true }).toString()
            )
            .toTex()} \\right|` + `\\cdot \\sigma ${variable}`;
      } else {
        derivadaLatex +=
          `\\left| ${math
            .parse(
              math.derivative(funcion, variable, { simplify: true }).toString()
            )
            .toTex()} \\right|` + `\\cdot \\sigma ${variable} +`;
      }
    });

    const resultadoField = document.getElementById("resultado");
    resultadoField.setValue(derivadaLatex);
  } catch (error) {
    const resultadoField = document.getElementById("resultado");
    resultadoField.setValue("Error \\ en \\ la \\ función");
  }
}

function copiarResultado() {
  const resultadoField = document.getElementById("resultado");
  const resultadoLatex = resultadoField.getValue("latex");

  navigator.clipboard
    .writeText(resultadoLatex)
    .then(() => {
      alert("Resultado copiado al portapapeles.");
    })
    .catch((err) => {
      alert("Error al copiar: " + err);
    });
}

function toggleAtajos() {
  const lista = document.querySelector(".atajos-lista");
  lista.classList.toggle("mostrar");
}
