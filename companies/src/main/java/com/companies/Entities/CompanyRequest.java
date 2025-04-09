package com.companies.Entities;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CompanyRequest {


    private int id;
    private String name;
    private String email;
    private String description;
    private String address;
    private int Pnumber;
    private String attachmentFileName;

}