/* eslint-disable react-refresh/only-export-components */
import withAuth from "../../hoc/withAuth";


function Home() {
  return (
    <div>
      <h1>Users</h1>
    </div>
  )
}

export default withAuth(Home);