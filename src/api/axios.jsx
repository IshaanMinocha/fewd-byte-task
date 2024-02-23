import axios from "axios";

export default axios.create({
    baseURL: "http://panel.mait.ac.in:8001"
}
)