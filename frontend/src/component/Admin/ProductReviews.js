import React, { Fragment, useEffect, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { useSelector, useDispatch } from "react-redux"
import { getAllReviews , deleteReviews } from "../../actions/productAction"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from "../layout/MetaData"
import DeleteIcon from "@material-ui/icons/Delete"
import Star from "@material-ui/icons/Star"
import SideBar from "./Sidebar"
import "./productReviews.css"


const ProductReviews = ({ history }) => {

  const [productId, setProductId] = useState("")

  const columns = [
    { field: "id", headerName: "Review ID", flex: 0.2 },

    {
      field: "user",
      headerName: "User",
      flex: 0.2,
    },

    {
      field: "comment",
      headerName: "Comment",
      flex: 0.25,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      flex: 0.15,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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
            <Button>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ]

  const rows = [];
      rows.push({
        id: 1,
        rating: 3,
        comment: 'Not bad',
        user: 'Deepak Karnadhar',
      })

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Search Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews
