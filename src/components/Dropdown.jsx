import PropTypes from 'prop-types'
function Dropdown({options}) {
  return (
    <div>
        <select name="" id=""  className="bg-[#EFF3F4] p-2 text-black focus:outline-blue-500">
            {options.map((item) => {
                return (
                    <option value="" key={item.id} > {item.name} </option>
                )
            })}
        </select>
    </div>
  )
}

Dropdown.propTypes = {
    options : PropTypes.array
}
export default Dropdown