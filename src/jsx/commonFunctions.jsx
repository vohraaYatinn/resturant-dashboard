import moment from "moment";

export const formattedDate = (timestamp) => {return moment(timestamp).format("MMMM Do YYYY, h:mm:ss A")}

export const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning"; // Yellow or orange color
      case "accepted":
        return "badge-success"; // Green color
      case "delivered":
        return "badge-primary"; // Blue color
      case "cancelled":
        return "badge-danger";  // Red color
      case "Ondelivery":
        return "badge-info";    // Light blue color
      default:
        return "badge-secondary"; // Default color if status is unrecognized
    }
  };

  export const getDataUsingStatus = (status) => {
    switch (status){
        case "pending":
            return "Pending"; // Yellow or orange color
          case "accepted":
            return "Accepted"; // Green color
          case "delivered":
            return "Delivered"; // Blue color
          case "cancelled":
            return "Cancelled";  // Red color
          case "Ondelivery":
            return "On Delivery";    // Light blue color
          default:
            return ""; // Default color if status is unrecognized
        }
    }
  