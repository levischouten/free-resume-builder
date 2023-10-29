import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import { format } from "date-fns";
import React from "react";
import { Schema } from "../_utils/schemas";

const FONT_MAP = {
  courier: {
    normal: "Courier",
    bold: "Courier-Bold",
    italic: "Courier-Oblique",
    boldItalic: "Courier-BoldOblique",
  },
  helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italic: "Helvetica-Oblique",
    boldItalic: "Helvetica-BoldOblique",
  },
  "times-roman": {
    normal: "Times-Roman",
    bold: "Times-Bold",
    italic: "Times-Italic",
    boldItalic: "Times-BoldItalic",
  },
};

type TemplateProps = {
  data: Schema;
};

function _Template(props: TemplateProps) {
  const { data } = props;

  const font = FONT_MAP[data.settings.font] || FONT_MAP.courier;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: font.normal,
      flexDirection: "row",
    },
    sidebar: {
      width: "30%",
      padding: 10,
    },
    mainContent: {
      width: "70%",
      padding: 10,
    },
    section: {
      marginBottom: 15,
    },
    title: {
      fontSize: 12,
      fontFamily: font.bold,
    },
    content: {
      fontSize: 8,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginVertical: 5,
    },
    name: {
      fontSize: 14,
      fontFamily: font.bold,
    },
    subSection: {
      marginBottom: 10,
    },
    subSectionTitle: {
      fontSize: 10,
      fontFamily: font.bold,
    },
    subSectionDate: {
      fontFamily: font.italic,
      fontSize: 8,
      color: "#666",
      marginBottom: 4,
    },
    summary: {
      marginBottom: 10,
    },
  });

  const stylesheet = {
    p: {
      fontSize: 10,
      margin: 0,
      padding: 0,
      fontFamily: font.normal,
    },
    strong: {
      fontWeight: 400,
      fontFamily: font.bold,
    },
    bold: {
      fontWeight: 400,
      fontFamily: font.bold,
    },
    em: {
      fontFamily: font.italic,
    },
    ul: {
      width: "90%",
      margin: 0,
      fontSize: 10,
      listStyleType: "disc",
    },
    ol: {
      width: "90%",
      margin: 0,
      fontSize: 10,
      listStyleType: "disc",
    },
  };

  let summaryHtml = "";

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.sidebar}>
          {data.sections.map((section, sectionIdx) => {
            if (section.type === "personalDetails") {
              summaryHtml = section.summary;
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.name}>
                    {section.firstName} {section.lastName}
                  </Text>
                  <Text style={styles.content}>{section.wantedJobTitle}</Text>
                  <Text style={styles.content}>{section.email}</Text>
                  <Text style={styles.content}>{section.phone}</Text>
                  {section.country || section.city ? (
                    <Text style={styles.content}>
                      {section.country}, {section.city}
                    </Text>
                  ) : null}
                  <Text style={styles.content}>{section.placeOfBirth}</Text>
                  {section.dateOfBirth ? (
                    <Text style={styles.content}>
                      {format(section.dateOfBirth, "MMMM d, yyyy")}
                    </Text>
                  ) : null}
                  <Text style={styles.content}>{section.address}</Text>
                  <Text style={styles.content}>{section.postalCode}</Text>
                  {section.drivingLicense ? (
                    <Text style={styles.content}>
                      License: {section.drivingLicense}
                    </Text>
                  ) : null}
                  <Text style={styles.content}>{section.nationality}</Text>
                </View>
              );
            } else if (section.type === "skills") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.skills.map((skill, skillIdx) => (
                    <Text key={skillIdx} style={styles.content}>
                      {skill.name} ({skill.level})
                    </Text>
                  ))}
                </View>
              );
            } else if (section.type === "languages") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>Languages</Text>
                  <View style={styles.divider} />
                  {section.languages.map((lang, idx) => (
                    <Text key={idx} style={styles.content}>
                      {lang.name} ({lang.level})
                    </Text>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>

        <View style={styles.mainContent}>
          {summaryHtml ? (
            <View style={styles.summary}>
              <Html stylesheet={stylesheet}>{summaryHtml}</Html>
            </View>
          ) : null}

          {data.sections.map((section, sectionIdx) => {
            if (section.type === "educations") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.educations.map((edu, eduIdx) => (
                    <View key={eduIdx} style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>{edu.school}</Text>
                      <Text style={styles.subSectionDate}>
                        {edu.startDate
                          ? format(edu.startDate, "MMMM yyyy")
                          : "N/A"}{" "}
                        -{" "}
                        {edu.endDate
                          ? format(edu.endDate, "MMMM yyyy")
                          : "Present"}
                      </Text>
                      <Html stylesheet={stylesheet}>{edu.description}</Html>
                    </View>
                  ))}
                </View>
              );
            } else if (section.type === "employmentHistory") {
              return (
                <View key={sectionIdx} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  <View style={styles.divider} />
                  {section.employments.map((job, jobIdx) => (
                    <View key={jobIdx} style={styles.subSection}>
                      <Text style={styles.subSectionTitle}>{job.jobTitle}</Text>
                      <Text style={styles.subSectionDate}>
                        {job.startDate
                          ? format(job.startDate, "MMMM yyyy")
                          : "N/A"}{" "}
                        -{" "}
                        {job.endDate
                          ? format(job.endDate, "MMMM yyyy")
                          : "Present"}
                      </Text>
                      <Html stylesheet={stylesheet}>{job.description}</Html>
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>
      </Page>
    </Document>
  );
}

export const Template = React.memo(_Template);
