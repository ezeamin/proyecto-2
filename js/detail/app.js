import { loadDetailData } from "./utilities.js";

const contentId = new URL(window.location.href).searchParams.get('id');

loadDetailData(contentId);