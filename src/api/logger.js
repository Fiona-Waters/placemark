/**
 * Validation Error Function used to log error messages.
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

export function validationError(request, h, error) {
  console.log(error.message);
}
