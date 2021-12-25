const Modal = ({ children, id, title, action }) => {
    return (
        <div className="modal fade" id={ id } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form onSubmit={ action }>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{ title }</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { children }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Modal;