export const filterById = (arr, target) => {
    let updatedArr = [...arr];
    for (var i = 0; i < updatedArr.length; i++) {
        if (updatedArr[i].id === target) {
            // Update
            return updatedArr;
        }
    }
}

export const removeById = (arr, target) => {
    const idx = arr.findIndex(el => {
        return el.id === target;
    });
    if (idx === -1) {
        return arr;
    };
    let updatedArr = [...arr];
    updatedArr.splice(idx, 1);
    return updatedArr;
};