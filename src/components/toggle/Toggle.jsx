import './Toggle.css'

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div>
      <label htmlFor="check">
        {isChecked ? (
          <span>Light Mode</span>
        ) : (
          <span>Dark Mode</span>
        )}
      </label>
      <input type="checkbox" id="check"
      className='toggle'
      onChange={handleChange}
      checked={isChecked} />
    </div>
  )
}