import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <br />
        <div className="row row-12 bg-light">
          <div className="col-1 bg-light">2022</div>
          <div className="col-1 bg-light">01/01</div>
          <div className="col-1 bg-light">01/02</div>
          <div className="col-1 bg-light">01/03</div>
          <div className="col-1 bg-light">01/04</div>
          <div className="col-1 bg-light">01/05</div>
          <div className="col-1 bg-light">01/06</div>
          <div className="col-1 bg-light">01/07</div>
        </div>
        <div className="row bg-light">
          <div className="col-1">Alphonso A.</div>

          <div className="col-5 bg-success rounded">PRJ-2022-0001</div>
        </div>
        <div className="row bg-light">
          <div className="col-1">Brian B.</div>
          <div className="col-2 rounded bg-warning">TSK-2022-0001</div>
          <div className="col-3 bg-info rounded">PRJ-2022-0002</div>
        </div>
        <div className="row bg-light">
          <div className="col-1">Charlie C.</div>

          <div className="col-7 bg-success rounded bg-danger">
            PRJ-2022-0003
          </div>
          <div className="row bg-light">
            <div className="col-1">Desiree D.</div>

            <div className="col-5 rounded m-2">
              <div onClick={() => alert(1)} className="alert bg-primary">
                PRJ-2022-0011
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
