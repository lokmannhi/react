export const splitOrder = (selectedItems) => {
    const maxPricePerPackage = 250;
    let packages = [];
    let currentPackage = { items: [], totalWeight: 0, totalPrice: 0 };

    const calculateCourierPrice = (weight) => {
        if (weight <= 200) return 5;
        if (weight <= 500) return 10;
        if (weight <= 1000) return 15;
        return 20; // for weight greater than 1000g
    };

    const distributeItems = (items) => {
      // First, try to add items to the current package until it exceeds $250
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (currentPackage.totalPrice + item.price <= maxPricePerPackage) {
                currentPackage.items.push(item);
                currentPackage.totalWeight += item.weight;
                currentPackage.totalPrice += item.price;
            } else {
          // If the current package exceeds, push it and start a new one
            packages.push({ ...currentPackage, courierPrice: calculateCourierPrice(currentPackage.totalWeight) });
                currentPackage = { items: [item], totalWeight: item.weight, totalPrice: item.price };
            }
        }

      // Push the last package if it has items
        if (currentPackage.items.length > 0) {
            packages.push({ ...currentPackage, courierPrice: calculateCourierPrice(currentPackage.totalWeight) });
        }
    };
    
    distributeItems(selectedItems);
    return packages;
};