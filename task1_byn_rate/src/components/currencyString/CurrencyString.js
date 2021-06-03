import React, {memo} from 'react'
import "./currencyString.css"

const CurrencyString = ({rate}) => {
  const {Cur_Abbreviation, Cur_Name, Cur_OfficialRate,  Cur_Scale} = rate;
  return (
    <tr>
      <td className="main-table__data">{Cur_Name}</td> 
      <td className="main-table__data">{`${Cur_Scale},  ${Cur_Abbreviation}`}</td> 
      <td className="main-table__data">{Cur_OfficialRate}</td> 
    </tr>
  )
}

export default memo(CurrencyString)
