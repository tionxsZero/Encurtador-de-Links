var botao = document.getElementById("encurtador");
var urldigitada = document.getElementById("url");
var jsonData;
var urlDestino = document.getElementById("urlresultado");

botao.addEventListener("click", verificarLink);

function verificarLink() {
  event.preventDefault();

  if (
    (urldigitada.value === "") | (urldigitada.value === null) ||
    urldigitada.value === undefined
  ) {
    alert("Verique a URL digitada");
    return;
  }
  var urlVerificada = urldigitada.value.split(":");

  // console.log(urlVerificada[0]);

  if (urlVerificada[0] !== "https") {
    if (urlVerificada[0] !== "http") {
      urlVerificada = urldigitada.value.split(".");

      // console.log(urlVerificada);
      if (urlVerificada[0] !== "www") {
        alert(
          "O texto colado ou digitado, não é um link. Verifique e tente novamente."
        );
      } else {
        encurtarLink();
        return;
      }
      alert(
        "O texto colado ou digitado, não é um link. Verifique e tente novamente."
      );
    } else {
      encurtarLink();
      return;
    }
    alert(
      "O texto colado ou digitado, não é um link. Verifique e tente novamente."
    );
  } else {
    encurtarLink();
  }
}

async function encurtarLink() {
  console.log("Url Confirmada -> " + urldigitada.value);
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 41183c6d3c847a951aa712bb79fe62fc605c8f45");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "long_url": urldigitada.value,
  "domain": "bit.ly",
  "group_guid": "Bmcpi4aARRj"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch(
    "https://api-ssl.bitly.com/v4/shorten",
    requestOptions
  );

  jsonData = await response.json();
  urlDestino.value = jsonData.link;
  console.log(jsonData.link);
}
