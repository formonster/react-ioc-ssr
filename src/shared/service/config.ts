import { isWindow } from "../assets/scripts/check";

export default {
    root: isWindow() ? "" : "http://localhost:4400"
}