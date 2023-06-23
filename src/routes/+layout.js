export const ssr = false;

import { getaccessTokenFromLocalStorage } from '../utils/auth.js'

export async function load() {
    await getaccessTokenFromLocalStorage()
  }
