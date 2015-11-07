package com.dndcomp.web.rest.util;

import org.springframework.http.HttpHeaders;

/**
 * Utility class for http header creation.
 *
 */
public class HeaderUtil {

    public static HttpHeaders createAlert(String message, String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-dnDCompanionApp-alert", message);
        headers.add("X-dnDCompanionApp-params", param);
        return headers;
    }

    public static HttpHeaders createEntityCreationAlert(String entityName, String param) {
        return createAlert("dnDCompanionApp." + entityName + ".created", param);
    }

    public static HttpHeaders createEntityUpdateAlert(String entityName, String param) {
        return createAlert("dnDCompanionApp." + entityName + ".updated", param);
    }

    public static HttpHeaders createEntityDeletionAlert(String entityName, String param) {
        return createAlert("dnDCompanionApp." + entityName + ".deleted", param);
    }
}
