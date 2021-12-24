import { Fragment } from "react";
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Forbidden = () => {
    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="card mt-3">
                            <div class="card-body">
                                <h5 class="card-title">Acceso denegado</h5>
                                <p class="card-text">Usted no cuenta con los permisos para acceder a esta vista.</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Forbidden;