import { Files, Trash3 } from "react-bootstrap-icons"

export const ListaRegalos = ({regalos, handleDelete, handleEdit, handleDuplicate}) => {
    if(regalos.length===0) {
      return <h3>No hay regalos, suma uno</h3>
    }
    return <>
    <ul>
      {regalos.map(regalo => 
        <li key={regalo.id}>
          <div className="giftRow">
            <div className="giftItem">
                <img src={regalo.Img} className='imageList' alt={regalo.name}/>
                <div>
                    <div>
                        {regalo.desc} {regalo.Qty>1?"("+regalo.Qty+")":""} {(regalo.PriceUnit||0)>0?" - " + (regalo.PriceUnit*regalo.Qty).toFixed(2):""}
                    </div>
                    <div className="listOwner">
                        {regalo.Owner}
                    </div>
                </div>
            </div>
            <div className="giftAction">
                <button title="edit" onClick={() => handleEdit(regalo)}>
                    <img alt="edit" src="edit24alfa.png"/>
                </button>
                <button title="duplicate" onClick={() => handleDuplicate(regalo)}><Files/></button>
                <button title="delete" onClick={() => handleDelete(regalo)}>
                    <Trash3/>
                </button>
            </div>
          </div>
        </li>
      )}    
    </ul>
    <hr />
    <p className="text-center font-weight-bold">
      Total $ {regalos.reduce((total, item) => total + (item.PriceUnit === undefined?0:item.PriceUnit*item.Qty), 0).toFixed(2)}
    </p>
    </>
  }
