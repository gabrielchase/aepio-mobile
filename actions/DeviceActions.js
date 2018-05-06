import { Actions } from 'react-native-router-flux'
import axios from 'axios'

import { 
    LOAD_TRUE,
} from './types'
import { HOST_URL } from '../const'

let headers = {
    "headers": {
      'Content-Type': 'application/json',
    }
}

