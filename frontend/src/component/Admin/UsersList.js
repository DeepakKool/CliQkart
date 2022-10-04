import React, { Fragment, useEffect } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction"
import { DELETE_USER_RESET } from "../../constants/userConstants"
import MetaData from "../layout/MetaData"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import SideBar from "./Sidebar"
import "./productList.css"

const UsersList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, users } = useSelector((state) => state.allUsers)
  const { error: deleteError , isDeleted, message } = useSelector((state) => state.profile)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success(message)
      history.push("/admin/users")
      dispatch({ type: DELETE_USER_RESET })
    }
    dispatch(getAllUsers())
  }, [ dispatch , alert , error , deleteError , history , isDeleted , message ])

  const columns = [
    { field: "id", headerName: "User ID", flex: 0.15 },

    {
      field: "email",
      headerName: "Email",
      flex: .25,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.15,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      flex: 0.15,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button>
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const rows = []
    users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      })
    })
  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default UsersList
