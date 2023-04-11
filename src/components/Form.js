import React from 'react'

export default function Form({value, btnSubmit, setValue}) {
  const textChange = (e) => {
    //console.log('e',e.target.value);
    setValue(e.target.value);
  }


  return (
    <div>
          <form style= {{display: 'flex'}} onSubmit={btnSubmit}>
            <input type="text" name="value" placeholder="해야 할 일을 입력하세요" onChange={textChange} value= {value} />
            <input type="submit" value="입력" />
          </form>
    </div>
  )
}
