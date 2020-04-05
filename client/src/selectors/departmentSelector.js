export const findDepartment = (departments,id) => {
    return departments.find(department => department._id == id)
}