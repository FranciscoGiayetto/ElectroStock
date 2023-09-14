import Table from 'react-bootstrap/Table';
import { MDBCard, MDBCardHeader } from 'mdb-react-ui-kit';

const DataTable = ({ presupuesto }) => {
  const calcularPrecioTotal = () => {
    let total = 0;
    for (const item of presupuesto) {
      total += item.quantity * parseFloat(item.price);
    }
    return total.toFixed(2);
  };

  return (
    <div>
      <MDBCard
        className="my-4 p-3"
        alignment='left'
        style={{
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        <MDBCardHeader className="bg-primary text-white">Detalle del Presupuesto</MDBCardHeader>

        <Table responsive striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody >
            {presupuesto.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky-tfoot">
            <tr>
              <td colSpan="4"></td>
              <th>Total:</th>
              <td>{calcularPrecioTotal()}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </MDBCard>
    </div>
  );
};

export default DataTable;
