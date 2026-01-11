package com.LNF_project.LNF.controller;

import com.LNF_project.LNF.model.Item;
import com.LNF_project.LNF.model.itemsList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/itemList")
public class itemListController {
    @Autowired
    private itemsList itl;
    public itemListController(itemsList itl){
        this.itl = itl;
    }

    @PostMapping ("/add")
    public void addItem(@RequestBody Item item){
        itl.addItemToList(item);
    }
    @GetMapping("/show")
    public itemsList ShowAll(){
        return itl;
    }

}
