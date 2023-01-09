export const ListaRegalos = ({regalos, handleDelete}) => {
    if(regalos.length===0) {
      return <h3>No hay regalos, suma uno</h3>
    }
    return <>
    <ul>
      {regalos.map(regalo => 
        <li key={regalo.desc}>
          <div className="giftRow">
            <div className="giftItem">
                <img src={regalo.Img} className='imageList' alt={regalo.name}/>
                <div>
                    <div>
                        {regalo.desc} {regalo.Qty>1?"x"+regalo.Qty:""}
                    </div>
                    <div className="listOwner">
                        {regalo.Owner}
                    </div>
                </div>
            </div>
            <button onClick={() => handleDelete(regalo)}>
                <img alt="trash" src="//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png"/>
            </button>
          </div>
        </li>
      )}    
    </ul>
    </>
  }
