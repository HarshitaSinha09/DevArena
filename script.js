function run() {
  const htmlCode = document.getElementById("html-code").value;
  const cssCode = document.getElementById("css-code").value;
  const jsCode = document.getElementById("js-code").value;
  const output = document.getElementById("output");
  const consoleOutput = document.getElementById("console-output");

  // Clear previous output
  consoleOutput.textContent = "";

  const fullCode = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script>
        const console = {
          log: (...args) => {
            parent.document.getElementById("console-output").textContent += args.join(" ") + "\\n";
          }
        };
        try {
          ${jsCode}
        } catch (err) {
          console.log("⚠️ Error: " + err.message);
        }
      </script>
    </body>
    </html>
  `;

  output.srcdoc = fullCode;
}

function downloadCode() {
  const htmlCode = document.getElementById("html-code").value;
  const cssCode = document.getElementById("css-code").value;
  const jsCode = document.getElementById("js-code").value;

  const fullHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Exported Page</title>
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>
      ${jsCode}
    </script>
  </body>
  </html>
  `;

  const blob = new Blob([fullHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my_code.html";
  link.click();
}