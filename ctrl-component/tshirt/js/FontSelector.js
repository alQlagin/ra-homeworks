const FontSelector = ({fonts, selectedFont, onSelect}) => {
  return (
    <div className="font-picker">
      {fonts.map(
        font => (<div className="grid center font-item">
          <input type="radio" name="font" value={font} id={font.name}
                 key={font.name}
                 defaultChecked={font === selectedFont}
                 onChange={event => onSelect(font)}/>
          <label htmlFor={font.name} className="grid-1">
            <PictureFont text="abc" path={font.path}/>
          </label>
        </div>)
      )}
    </div>
  )
};