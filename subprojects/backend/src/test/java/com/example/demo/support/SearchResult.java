package com.example.demo.support;

import lombok.Data;

import java.util.List;
import java.util.Map;

public class SearchResult<T> {

    private String test;

    private Page page;

    private List<T> content;

    private Map<String, Link> _links;

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Map<String, Link> get_links() {
        return _links;
    }

    public void set_links(Map<String, Link> _links) {
        this._links = _links;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }
}
