let $cajita = document.getElementById(`cajita`);
let $mujer = document.getElementById(`mujer`);
let $hombre = document.getElementById(`hombre`);
let $todos = document.getElementById(`todos`);
let $siguiente = document.getElementById(`siguiente`);
let $final = document.getElementById(`final`);
let $anterior = document.getElementById(`anterior`);
let $principio = document.getElementById(`principio`);
let $singenero = document.getElementById(`genderless`);
let $desconocido = document.getElementById(`unknown`);
let $numero = document.getElementById(`numero-pagina`);
let $contador = document.getElementById(`contador`);

let todosPersonajes = [];
let pagina = 1;

function usarFetch(pagina) {
	fetch(`https://rickandmortyapi.com/api/character/?page= ${pagina}`)
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			todosPersonajes = data.results;
			ver(todosPersonajes);
			if (pagina <= 1) {
				$principio.disabled = true;
                $anterior.disabled = true;
			} else {
				$principio.disabled = false;
                $anterior.disabled = false;
			}

			if (pagina >= 42) {
				$final.disabled = true;
                $siguiente.disabled = true;
			} else {
				$final.disabled = false;
                $siguiente.disabled = false;
			}
            $numero.innerHTML = `${pagina}`;
            
		}); 

}


usarFetch(pagina);

function ver(array) {
	console.log(array);
	$cajita.innerHTML = ``;
	for (let i = 0; i < array.length; i++) {
		$cajita.innerHTML += `<div id="personaje">
    <img src=${array[i].image} >
    <h2>Nombre: ${array[i].name}</h2>
    <p>Género:${array[i].gender} </p>
    <p>Especies:${array[i].species} </p>
    <p>Estado:${array[i].status} </p>
    <p>Origen:${array[i].origin.name} </p>
    <p>Locación:${array[i].location.name} </p>
  </div>`;
	} 
	$contador.innerHTML = `${todosPersonajes.length}`
}


function vermujer() {
	let resultado = todosPersonajes.filter((personaje) => {
		return personaje.gender === `Female`;
	});
	ver(resultado);
}

$mujer.addEventListener(`click`, vermujer);

function verhombre() {
	let resultado = todosPersonajes.filter((personaje) => {
		return personaje.gender === `Male`;
	});
	ver(resultado);
}

$hombre.addEventListener(`click`, verhombre);

function versin() {
	let resultado = todosPersonajes.filter((personaje) => {
		return personaje.gender === `Genderless`;
	});
	ver(resultado);
}
$singenero.addEventListener(`click`, versin);

function desconocido() {
	let resultado = todosPersonajes.filter((personaje) => {
		return personaje.gender === `unknown`;
	});
	ver(resultado);
}
$desconocido.addEventListener(`click`, desconocido);

function vertodos() {
	let resultado = todosPersonajes.filter((personaje) => {
		return todosPersonajes;
	});
	ver(resultado);
}
$todos.addEventListener(`click`, vertodos);

function siguientePagina() {
    if (pagina < 42) {
        pagina++;
        usarFetch(pagina);
    }
}

$siguiente.addEventListener(`click`, siguientePagina);

function anteriorPagina() {
    if (pagina > 1) {
        pagina--;
        usarFetch(pagina);
    }
}

$anterior.addEventListener(`click`, anteriorPagina);

function finalPagina() {
    pagina = 42;
	usarFetch(pagina);
}
$final.addEventListener(`click`, finalPagina);

function principio() {
    pagina = 1;
	usarFetch(pagina);
}
$principio.addEventListener(`click`, principio);