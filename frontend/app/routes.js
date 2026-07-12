import {route, index, layout} from "@react-router/dev/routes";


export default [
    index("routes/login.jsx"),
    layout("routes/layout.jsx", [
        route("home","routes/home.jsx" ),
        route("repository", "routes/repository.jsx")
    ]),
];