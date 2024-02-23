import axios from "axios";

export default axios.create({
    baseURL: "https://panel.mait.ac.in:8001"
}
)