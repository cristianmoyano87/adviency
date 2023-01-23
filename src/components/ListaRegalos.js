export const ListaRegalos = ({regalos, handleDelete, handleEdit}) => {
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
                <button onClick={() => handleEdit(regalo)}>
                    <img alt="edit" src="edit24alfa.png"/>
                </button>
                <button onClick={() => handleDelete(regalo)}>
                    <img alt="trash" src="//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"/>
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
