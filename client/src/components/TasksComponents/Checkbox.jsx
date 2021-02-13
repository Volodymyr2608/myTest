import React from "react"


export const Checkbox = ({item}) => {
  return (
    <>
      <div id={item}>
        <div>
          <input type="text" placeholder="Напишіть запитання"/>
        </div>
        <div>
          <div>
            <input id="item1" type="checkbox"/>
            <input type="text" placeholder="Item1"/>
          </div>
          <div>
            <input id="item2" type="checkbox"/>
            <input type="text" placeholder="Item2"/>
          </div>
          <div>
            <input id="item2" type="checkbox"/>
            <input type="text" placeholder="Item2"/>
          </div>
          <div>
            <input id="item2" type="checkbox"/>
            <input type="text" placeholder="Item2"/>
          </div>         
        </div>
      </div>
    </>
    )
}