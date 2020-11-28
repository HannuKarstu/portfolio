import React from 'react'


const DisplayFilter = (props) => {
    return (
        <form>
            filter shown with
            <input
                onChange={props.handleFilterChange}
            />
        </form>
    )
}

export default DisplayFilter