// Constants
const apiUrl = "https://jsonplaceholder.typicode.com";
const postsUrl = `${apiUrl}/posts`;
const albumsUrl = `${apiUrl}/albums`;
const todosUrl = `${apiUrl}/todos`;

// Utils
const getApi = url => {
  return fetch(url).then(res => res.json());
};

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const createTable = (tableTitle, htmlElem, list) => {
  let tableHtml = `<table id="tb1">`;

  // Table Title
  htmlElem.innerHTML = `<h1>${tableTitle}</h1>
                        <br>`;

  const [exampleElement] = list;
  const headerTitles = Object.keys(exampleElement); // = ['id', 'userId', ...]

  const headers = headerTitles.reduce((acumm, item) => {
    return `${acumm}<th scope="col" class="hn1">${toTitleCase(item)}</th>`;
  }, "");

  tableHtml += `<thead>
                  ${headers}
                </thead>`;

  // Table Body
  const rows = list.reduce((acumm, item) => {
    const values = Object.values(item);
    const cellValues = values.reduce(
      (acumm, value) => `${acumm}<td>${value}</td>`,
      ""
    );

    return `${acumm}<tr>${cellValues}</tr>`;
  }, "");

  tableHtml += ` <tbody>
                            ${rows}
                          </tbody>`;

  // End
  tableHtml += `</table>`;

  htmlElem.innerHTML += tableHtml;
};

// Show items
const showPosts = async () => {
  const posts = await getApi(postsUrl);
  const boxElement = document.getElementById("exibe");

  createTable("Postagens", boxElement, posts);
};

const showAlbums = async () => {
  const albums = await getApi(albumsUrl);
  const boxElement = document.getElementById("exibe");

  createTable("Álbuns", boxElement, albums);
};

const showTodos = async () => {
  const todos = await getApi(todosUrl);
  const boxElement = document.getElementById("exibe");

  createTable("Todos", boxElement, todos);
};

// Event Listeners
document.getElementById("posts").addEventListener("click", showPosts);
document.getElementById("albuns").addEventListener("click", showAlbums);
document.getElementById("todos").addEventListener("click", showTodos);
