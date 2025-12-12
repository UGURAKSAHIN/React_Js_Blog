import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ReusabilityToast from "../../app/reusability/ReusabilityToast";
import BlogCategoryApiService from "../../services/BlogCategoryApiService";
import { withTranslation } from "react-i18next";

function BlogCategoryManagement({ t }) {
  
  const [blogCategoryApiListData, setBlogCategoryApiListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("show");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ categoryName: "" });
  const [saving, setSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const showToast = (title, variant = "default") => {
    const styles = {
      create: { background: "#146c43", icon: "✅" },
      update: { background: "#0d6efd", icon: "ℹ️" },
      delete: { background: "#842029", icon: "🗑️" },
      default: { background: "#343a40", icon: "ℹ️" },
    };
    const { background, icon } = styles[variant] || styles.default;
    toast(title, {
      icon,
      duration: 2500,
      style: {
        borderRadius: "10px",
        padding: "10px",
        background,
        color: "#fff",
        fontWeight: 500,
        fontSize: "0.9rem",
      },
    });
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  const fetchBlogList = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await BlogCategoryApiService.objectApiList();

      if (response.status === 200) {
        setBlogCategoryApiListData(response.data);
        if (process.env.NODE_ENV === "development") {
          console.debug("Fetched Blog Categories:", response.data);
        }
      }
    } catch (err) {
      console.error("Blog Category fetchBlogList:", err);
      setError("Failed to load blog categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize, blogCategoryApiListData.length]);

  const { pageData, totalItems, totalPages } = useMemo(() => {
    const normalized = searchTerm.toLowerCase().trim();
    const filtered = blogCategoryApiListData.filter((cat) => {
      const idStr = String(cat.categoryId ?? "").toLowerCase();
      const nameStr = (cat.categoryName ?? "").toLowerCase();
      const dateStr = (cat.systemCreatedDate ?? "").toLowerCase();
      return (
        idStr.includes(normalized) ||
        nameStr.includes(normalized) ||
        dateStr.includes(normalized)
      );
    });

    const total = filtered.length || 0;
    const pages = total === 0 ? 1 : Math.ceil(total / pageSize);
    const safePage = Math.min(Math.max(1, currentPage), pages);
    const start = (safePage - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return { pageData: paged, totalItems: total, totalPages: pages };
  }, [blogCategoryApiListData, searchTerm, pageSize, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(start + max - 1, totalPages);
    if (end - start < max - 1) start = Math.max(1, end - max + 1);
    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  
  const openCreateModal = () => {
    setModalMode("create");
    setSelectedCategory(null);
    setFormData({ categoryName: "" });
    setIsModalOpen(true);
  };

  const openShowModal = (category) => {
    setModalMode("show");
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setFormData({ categoryName: category.categoryName || "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({ categoryName: "" });
    setModalMode("show");
  };

  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (modalMode === "create") {
        const response = await BlogCategoryApiService.objectApiCreate(formData);
        if ([200, 201].includes(response.status)) {
          await fetchBlogList();
          closeModal();
          showToast("Blog Category created", "create");
        }
      } else if (modalMode === "edit" && selectedCategory?.categoryId) {
        const response = await BlogCategoryApiService.objectApiUpdate(
          selectedCategory.categoryId,
          formData
        );
        if (response.status === 200) {
          await fetchBlogList();
          closeModal();
          showToast("Blog Category updated", "update");
        }
      }
    } catch (err) {
      console.error("handleSubmit error:", err);
      setError(
        modalMode === "create"
          ? "An error occurred while creating category."
          : "An error occurred while updating category."
      );
    } finally {
      setSaving(false);
    }
  };


  const handleDelete = async (category) => {
    const result = await Swal.fire({
      title: `"${category.categoryName}" ${t("delete")}?`,
      text: t("cannot_undo"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes_delete"),
      cancelButtonText: t("discard"),
    });

    if (!result.isConfirmed) return;

    try {
      setError("");
      const res = await BlogCategoryApiService.objectApiDelete(category.categoryId);
      if (res.status === 200) {
        await fetchBlogList();
        showToast("Successfully deleted", "delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Delete failed", "default");
    }
  };

  
  const getModalTitle = () =>
    ({
      create: "Create Blog Category",
      edit: "Update Blog Category",
      show: "Blog Category Detail",
    }[modalMode]);

  const renderModalBody = () => {
    if (modalMode === "show" && selectedCategory) {
      return (
        <div>
          <p>
            <strong>ID:</strong> {selectedCategory.categoryId}
          </p>
          <p>
            <strong>{t("blog_category_name")}:</strong>{" "}
            {selectedCategory.categoryName}
          </p>
          <p>
            <strong>{t("date")}:</strong>{" "}
            {selectedCategory.systemCreatedDate || "-"}
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("blog_category_name")}</label>
          <input
            type="text"
            name="categoryName"
            className="form-control"
            value={formData.categoryName}
            onChange={handleChange}
            placeholder="backend, frontend..."
            required
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={closeModal}
          >
            {t("close")}
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving
              ? t("saving")
              : modalMode === "create"
              ? t("create")
              : t("update")}
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      <ReusabilityToast />
      <h1 className="text-center mt-4">{t("blog_category_list")}</h1>

      {/* FILTERS */}
      <div className="container mb-3">
        <div className="row align-items-end g-2">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Filter</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">
              {t("record_per_page")}
            </label>
            <select
              className="form-select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 7, 10, 15, 25].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-5 text-md-end">
            <label className="form-label fw-semibold d-block">
              Total Record
            </label>
            <div className="d-flex justify-content-md-end align-items-center gap-3">
              <span className="badge bg-secondary">{totalItems}</span>
              <button className="btn btn-primary" onClick={openCreateModal}>
                <i className="fa-solid fa-plus me-1" />
                {t("create")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : pageData.length === 0 ? (
        <div className="alert alert-warning">{t("no_results")}</div>
      ) : (
        <div className="table-responsive container">
          <table
            className="table table-striped table-dark table-bordered align-middle"
            style={{ borderRadius: "0.75rem", overflow: "hidden" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("blog_category_name")}</th>
                <th>{t("date")}</th>
                <th>{t("update")}</th>
                <th>{t("show")}</th>
                <th>{t("delete")}</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((cat) => (
                <tr key={cat.categoryId}>
                  <td>{cat.categoryId}</td>
                  <td>{cat.categoryName}</td>
                  <td>{cat.systemCreatedDate}</td>
                  <td>
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => openEditModal(cat)}
                    >
                      <i className="fa-solid fa-wrench" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => openShowModal(cat)}
                    >
                      <i className="fa-solid fa-eye" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(cat)}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalItems > 0 && (
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
              <div className="text-muted">
                {t("page")} {currentPage} / {totalPages}
              </div>

              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(1)}>
                    «
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    ‹
                  </button>
                </li>

                {getPageNumbers().map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      disabled={currentPage === page}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    ›
                  </button>
                </li>
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={() => goToPage(totalPages)}>
                    »
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content animate__animated animate__zoomIn">
              <div className="modal-header">
                <h5 className="modal-title">{getModalTitle()}</h5>
                <button className="btn-close" onClick={closeModal} />
              </div>
              <div className="modal-body">{renderModalBody()}</div>

              {modalMode === "show" && selectedCategory && (
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    {t("close")}
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => openEditModal(selectedCategory)}
                  >
                    <i className="fa-solid fa-wrench me-1" />
                    {t("update")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default withTranslation()(BlogCategoryManagement);
