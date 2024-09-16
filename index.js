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
    let resultadoNumerico = 0;

    // Al recorrer las variables me fijo si incluye el =, entonces hago una separacion de todo lo que necesito
    // por ejemplo: x=3/0.02  siendo x la variable, 3 el valor de x y 0.02 el error asociado a la medicion
    // entonces derivo, evaluo en el punto, y luego multiplico por su error

    arrayVariables.forEach((variable, index) => {
      if (inputVar.includes("=")) {
        let sepEqual = variable.split("=");
        let sepValorError = sepEqual[1].split("/");

        let scope = {
          [sepEqual[0]]: parseFloat(sepValorError[0]),
        };

        resultadoNumerico +=
          math.abs(
            math
              .derivative(funcion, sepEqual[0], {
                simplify: true,
              })
              .evaluate(scope)
          ) * sepValorError[1];
      } else if (index === arrayVariables.length - 1) {
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
    if (derivadaLatex === "" && resultadoNumerico !== 0) {
      resultadoField.setValue(resultadoNumerico.toString());
    } else {
      resultadoField.setValue(derivadaLatex);
    }
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
