package com.LNF_project.LNF.model;
import com.LNF_project.LNF.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Component
public class itemsList {

    List<Item> itemList = new ArrayList<>();

    public void addItemToList(Item it) {
        Item item = new Item(it.getId(), it.getItemName(), it.getDescription(),it.getOwnerName(),it.isFound(), it.getContactNo());
        itemList.add(item);
    }

    @Override
    public String toString(){
        return itemList.toString();
    }
}


//
//int id, String itemName, String Description, String ownerName, boolean found, BigDecimal contactNo